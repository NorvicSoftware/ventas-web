<?php

namespace App\Http\Controllers\APIs\Resports;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product;
use Barryvdh\DomPDF\Facade\Pdf;
use App\Exports\StockProductExport;
use Maatwebsite\Excel\Facades\Excel;

class ProductsStockController extends Controller
{
    public function list(){
        $products = Product::with(['category'])->where('quantity', '<', 50)->get();
        return response()->json($products);
    }

    public function pdf(){
        $data =[
            'products' => Product::with(['category'])->get(),
        ];
        $pdf = Pdf::loadView('reports.products.pdf', $data);
        return $pdf->stream();

    }

    public function excel () {
        return Excel::download(new StockProductExport, 'stock-de-productos.xlsx');
    }


}
