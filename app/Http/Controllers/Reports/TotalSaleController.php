<?php

namespace App\Http\Controllers\Reports;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Sale;
use Inertia\Inertia;

class TotalSaleController extends Controller
{
    public function list(){
        $sales = Sale::with(['client', 'user', 'products'])->get();
        return Inertia::render('Reports/Sales/List', ['sales' => $sales ]);
    }
}
