<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use Inertia\Inertia;
use App\Models\Category;

class DashboardController extends Controller
{
    public function index(){
        $categories = Category::all();
        $products =  Product::with('image')->get();
        return Inertia::render('Dashboard', ['products' => $products, 'categories' => $categories]);
    }
    
}
