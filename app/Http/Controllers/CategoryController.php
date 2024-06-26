<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Exception;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categories = Category::orderBy('name', 'ASC')->get();
        return Inertia::render('Categories/Index', ['categories' => $categories]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Categories/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|min:3|max:35'
        ]);

        try {
            $category = new Category();
            $category->name = $request->name;
            $category->description = $request->description;
            $category->save();

            return Redirect::route('categories.index')->with(['status' => true, 'message' => 'La categoria ' . $category->name . ' fue registrada correctamente']);
        } catch (Exception $exc) {
            return Redirect::route('categories.index')->with(['status' => false, 'message' => 'Existen errores en el formulario.']);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $category = Category::find($id);
        return Inertia::render('Categories/Show', ['category' => $category]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $category = Category::findOrFail($id);
        return Inertia::render('Categories/Edit', ['category' => $category]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'name' => 'required|min:3|max:35'
        ]);

        try {
            $category = Category::findOrFail($id);
            $category->name = $request->name;
            $category->description = $request->description;
            $category->save();

            return Redirect::route('categories.index')->with(['status' => true, 'message' => 'La categoria ' . $category->name . ' fue actualizada correctamente']);
        } catch (Exception $exc) {
            return Redirect::route('categories.index')->with(['status' => false, 'message' => 'Existen errores en el formulario.']);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $category = Category::findOrFail($id);
        $category->delete();

        return Redirect::route('categories.index');
    }
}
