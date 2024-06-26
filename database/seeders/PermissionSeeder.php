<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Permission::create(['name' => 'listado categorias']);
        // Permission::create(['name' => 'crear categorias']);
        // Permission::create(['name' => 'editar categorias']);
        // Permission::create(['name' => 'eliminar categorias']);

        Permission::create(['name' => 'Lectura categorias']);
        Permission::create(['name' => 'Escritura categorias']);

        Permission::create(['name' => 'Lectura proveedores']);
        Permission::create(['name' => 'Escritura proveedores']);

        Permission::create(['name' => 'Lectura clientes']);
        Permission::create(['name' => 'Escritura clientes']);

        Permission::create(['name' => 'Lectura productos']);
        Permission::create(['name' => 'Escritura productos']);


    }
}
