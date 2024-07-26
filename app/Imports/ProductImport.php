<?php

namespace App\Imports;

use App\Models\Product;
use Illuminate\Support\Facades\Hash;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class ProductImport implements ToModel, WithHeadingRow
{
    /**
     * @param array $row
     *
     * @return User|null
     */
    public function model(array $row)
    {
        return new Product([
           'name'     => $row['producto'],
           'sale_price'    => $row['precio'], 
           'quantity' => $row['cantidad'],
           'status'    => $row['estado'], 
           'category_id'    => 1, 
        ]);
    }
}