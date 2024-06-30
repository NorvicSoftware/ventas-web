<?php

namespace App\Exports;

use App\Models\Product;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\FromView;
use Illuminate\Contracts\View\View;

class StockProductExport implements FromView
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function view(): View
    {
        $products = Product::with(['category'])->get();
        return view('reports.products.excel', ['products' => $products]);
        
        // return Product::with(['category'])->select('name', 'quantity')->get();
    }
}
