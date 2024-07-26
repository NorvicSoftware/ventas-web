<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use App\Models\Category;
use Exception;
use Illuminate\Support\Facades\DB;
use App\Imports\ProductImport;
use Maatwebsite\Excel\Facades\Excel;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // $products = DB::table('products')->join('categories', 'categories.id', '=', 'products.category_id')->select('products.*', 'categories.name as category_name')->get();
        $categories = Category::all();
        $products = Product::with(['category', 'image'])->orderBy('name', 'ASC')->get();
        return Inertia::render('Products/Index', ['products' => $products, 'categories' => $categories]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories = Category::all();
        return Inertia::render('Products/Create', ['categories' => $categories]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|min:3|max:75|unique:products,name,except,id',
            'sale_price' => 'required',
            'status' => 'required'
        ]);
        DB::beginTransaction();
        try {
            $product = new Product($request->all());
            $product->save();

            if ($request->hasFile('image')) {
                $image_path = 'public/images';
                $image = $request->file('image');
                $name_image = time() . "-" . $image->getClientOriginalName();
                $request->file('image')->storeAs($image_path, $name_image);

                $product->image()->create(['url' => $name_image]);
            }
            DB::commit();
            return Redirect::route('products.index')->with(['status' => true, 'message' => 'El producto ' . $product->name . ' fue registrado correctamente']);
        } catch (Exception $exc) {
            DB::rollBack();
            return Redirect::route('products.index')->with(['status' => false, 'message' => 'Existen errores en el formulario.']);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $product = Product::find($id);
        return Inertia::render('Products/Show', ['product' => $product]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $categories = Category::all();
        $product = Product::find($id);
        return Inertia::render('Products/Edit', ['product' => $product, 'categories' => $categories]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'name' => 'required|min:3|max:75|unique:products,name,' . $id,
            'sale_price' => 'required',
            'status' => 'required'
        ]);
        DB::beginTransaction();
        try {
            $product = Product::find($id);
            $product->name = $request->name;
            $product->sale_price = $request->sale_price;
            $product->quantity = $request->quantity;
            $product->status = $request->status;
            $product->category_id = $request->category_id;
            $product->save();

            if ($request->hasFile('image')) {
                $image_path = 'public/images';
                $image = $request->file('image');
                $name_image = time() . "-" . $image->getClientOriginalName();
                $request->file('image')->storeAs($image_path, $name_image);

                if ($product->image === null) {
                    $product->image()->create(['url' => $name_image]);
                } else {
                    $product->image()->update(['url' => $name_image]);
                }
            }
            DB::commit();
            return Redirect::route('products.index')->with(['status' => true, 'message' => 'El producto ' . $product->name . ' fue actualizado correctamente']);
        } catch (Exception $exc) {
            DB::rollBack();
            return Redirect::route('products.index')->with(['status' => false, 'message' => 'Existen errores en el formulario.']);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $product = Product::find($id);
        $product->delete();

        return Redirect::route('products.index');
    }


    public function import(Request $request)
    {
        $request->validate([
            'excel' => 'required|mimes:xlsx', //csv, xls
        ]);
        try {
            Excel::import(new ProductImport, $request->file('excel'));
            return Redirect::route('products.index')->with(['status' => true, 'message' => 'Los productos fueron importados correctamente']);
        } catch (Exception $esc) {
            return Redirect::route('products.index')->with(['status' => false, 'message' => 'No se completo la carga del archivo excel. ' . $esc->getMessage()]);
        }
    }

    public function load(Request $request)
    {

        try {
            $products = DB::connection('mysql2')->select('SELECT * FROM productos');

            foreach ($products as $item) {
                $exit = Product::where('name', '=', $item->nombre)->first();
                if ($exit) {
                    $product = Product::find($exit->id);
                    $product->name = $item->nombre;
                    $product->sale_price = $item->precio;
                    $product->quantity = 0;
                    $product->status = 'Activo';
                    $product->category_id = 1;
                    $product->save();
                } else {
                    $product = new Product();
                    $product->name = $item->nombre;
                    $product->sale_price = $item->precio;
                    $product->quantity = 0;
                    $product->status = 'Activo';
                    $product->category_id = 1;
                    $product->save();
                }
            }
            return Redirect::route('products.index')->with(['status' => true, 'message' => 'Los productos fueron cargados correctamente']);
        } catch (Exception $esc) {
            return Redirect::route('products.index')->with(['status' => false, 'message' => 'No se completo la carga de la base de datos. ' . $esc->getMessage()]);
        }
    }
}
