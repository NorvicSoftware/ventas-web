<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\APIs\CategoryController;
use Maatwebsite\Excel\Row;
use App\Http\Controllers\APIs\Resports\ProductsStockController;
use App\Http\Controllers\APIs\Resports\ClientController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::controller(CategoryController::class)->group(function(){
    Route::get('/categories', 'index');
    Route::post('/categories/create', 'store');
    Route::get('/categories/show/{id}', 'show');
    Route::put('/categories/edit/{id}', 'update');
    Route::delete('/categories/delete/{id}', 'destroy');
});

Route::controller(ProductsStockController::class)->group(function(){
    Route::get('/reports/stockProducts', 'list');
    Route::get('/reports/stockProducts/pdf', 'pdf');
    Route::get('/reports/stockProducts/excel', 'excel');
});

Route::controller(ClientController::class)->group(function(){
    Route::get('/reports/clients', 'list');
    // Route::get('/reports/stockProducts/pdf', 'pdf');
    // Route::get('/reports/stockProducts/excel', 'excel');
});
