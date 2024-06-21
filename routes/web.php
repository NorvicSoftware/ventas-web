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
use App\Http\Controllers\ProductController;
use App\Http\Controllers\DashboardController;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {

    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware('auth')->group(function () {
    Route::controller(CategoryController::class)->group(function () {
        Route::get('/categories', 'index')->name('categories.index');
        Route::get('/categories/create', 'create');
        Route::post('/categories/store', 'store')->name('categories.store');
        Route::get('/categories/show/{id}', 'show');
        Route::get('/categories/edit/{id}', 'edit');
        Route::put('/categories/update/{id}', 'update')->name('categories.update');
        Route::delete('/categories/delete/{id}', 'destroy');
    });

    Route::controller(ProductController::class)->group(function () {
        Route::get('/products', 'index')->name('products.index');
        Route::get('/products/create', 'create');
        Route::post('/products/store', 'store')->name('products.store');
        Route::get('/products/show/{id}', 'show');
        Route::get('/products/edit/{id}', 'edit');
        Route::post('/products/update/{id}', 'update')->name('products.update');
        Route::delete('/products/delete/{id}', 'destroy');
    });

    Route::controller(ProviderController::class)->group(function () {
        Route::get('/providers', 'index')->name('providers.index');
        Route::get('/providers/create', 'create');
        Route::post('/providers', 'store')->name('providers.store');
        Route::get('/providers/{id}', 'show');
        Route::get('/providers/{id}/edit', 'edit');
        Route::put('/providers/{id}', 'update')->name('providers.update');
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
        Route::get('/clients', 'index')->name('clients.index');
        Route::get('/clients/create', 'create')->name('clients.create');
        Route::post('/clients', 'store')->name('clients.store');
        Route::get('/clients/{id}', 'show')->name('clients.show');
        Route::get('/clients/{id}/edit', 'edit')->name('clients.edit');
        Route::put('/clients/{id}', 'update')->name('clients.update');
        Route::delete('/clients/{id}', 'destroy')->name('clients.destroy');
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
});




require __DIR__ . '/auth.php';
