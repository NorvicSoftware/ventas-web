<?php

namespace App\Http\Controllers\APIs;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Category;
use Exception;
use Illuminate\Support\Facades\DB;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categories = Category::all(); //orderBy('name', 'ASC')->get();
        return response()->json($categories);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $category = new Category();
            $category->name = $request->name;
            $category->description = $request->description;
            $category->save();

            return response()->json(['status' => true, 'message' => 'La categoria fue resgitrada con exito']);
        } catch (Exception $exc) {
            return response()->json(['status' => false, 'message' => 'Existe errores al registrar la categoria' . $exc->getMessage()]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $category = Category::find($id);
        return response()->json($category);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        try{
            $category = Category::find($id);
            $category->name = $request->name;
            $category->description = $request->description;
            $category->save();
            return response()->json(['status' => true, 'message' => 'La categoria fue actualizada con exito']);
        }
        catch(Exception $exc) {
            return response()->json(['status' => false, 'message' => 'Error al actualizar la categoria']);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $category = Category::find($id);
        $category->delete();
        return response()->json(['status' => true, 'message' => 'La categoria fue eliminda con exito']);

    }
}
