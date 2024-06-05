<?php

use App\Http\Controllers\BuyController;
use App\Http\Controllers\ProfileController;
use App\Models\Category;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\ProviderController;
use App\Http\Controllers\SaleController;

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

Route::controller(ProviderController::class)->group(function () {
    Route::get('/providers', 'index');
    Route::get('/providers/create', 'create');
    Route::post('/providers', 'store');
    Route::get('/providers/{id}', 'show');
    Route::get('/providers/{id}/edit', 'edit');
    Route::put('/providers/{id}', 'update');
    Route::delete('/providers/{id}', 'destroy');
});

Route::controller(BuyController::class)->group(function () {
    Route::get('/buys', 'index');
    Route::get('/buys/create', 'create');
    Route::post('/buys', 'store');
    Route::get('/buys/{id}', 'show');
    Route::get('/buys/{id}/edit', 'edit');
    Route::put('/buys/{id}', 'update');
    Route::delete('/buys/{id}', 'destroy');
});

Route::controller(ClientController::class)->group(function () {
    Route::get('/clients', 'index');
    Route::get('/clients/create', 'create');
    Route::post('/clients', 'store');
    Route::get('/clients/{id}', 'show');
    Route::get('/clients/{id}/edit', 'edit');
    Route::put('/clients/{id}', 'update');
    Route::delete('/clients/{id}', 'destroy');
});

Route::controller(SaleController::class)->group(function () {
    Route::get('/sales', 'index');
    Route::get('/sales/create', 'create');
    Route::post('/sales', 'store');
    Route::get('/sales/{id}', 'show');
    Route::get('/sales/{id}/edit', 'edit');
    Route::put('/sales/{id}', 'update');
    Route::delete('/sales/{id}', 'destroy');
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
