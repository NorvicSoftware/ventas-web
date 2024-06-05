<?php

use App\Http\Controllers\ProfileController;
use App\Models\Category;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\CategoryController;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/test', function () {
    /* $category = new Category();
    $category->name = "Aguas y geseosas";
    $category->save(); */

    $categories = Category::select('name')->get();
    return view('test', ['categories' => $categories]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::controller(CategoryController::class)->group(function () {
    Route::get('/categories', 'index');
    Route::get('/categories', 'create');
    Route::post('/categories/store', 'store');
    Route::get('/categories/show/{id}', 'show');
    Route::get('/categories/edit/{id}', 'edit');
    Route::put('/categories/update/{id}', 'update');
    Route::delete('/categories/delete/{id}', 'destroy');
});






Route::controller(CategoryController::class)->group(function () {
    Route::get('/categories', 'index');
    Route::get('/categories', 'create');
    Route::post('/categories/store', 'store');
    Route::get('/categories/show/{id}', 'show');
    Route::get('/categories/edit/{id}', 'edit');
    Route::put('/categories/update/{id}', 'update');
    Route::delete('/categories/delete/{id}', 'destroy');
});






require __DIR__ . '/auth.php';
