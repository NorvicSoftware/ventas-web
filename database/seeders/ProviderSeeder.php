<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProviderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('providers')->insert(
            [
                'company' => 'Coca Cola',
                'contact' => '77777777',
                'cell_phone' => '787878',
                'address' => 'Cochabamba',
                'email' => 'cocacola@gmail.com',
            ],
            [
                'company' => 'Coca Cola',
                'contact' => '77777777',
            ],
        );
        DB::table('providers')->insert(
            [
                'company' => 'Mabel',
                'contact' => '77777777',
                'cell_phone' => '787878',
                'address' => 'Cochabamba',
                'email' => 'cocacola@gmail.com',
            ],
            [
                'company' => 'San Gabriel',
                'contact' => '77777777',
            ],
        );
    }
}
