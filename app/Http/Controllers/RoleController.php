<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Illuminate\Support\Facades\DB;
use Exception;

class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $roles = Role::with('permissions')->get();
        $permissions = Permission::all();
        return Inertia::render('Roles/Index', ['roles' => $roles, 'permissions' => $permissions]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
        ]);

        DB::beginTransaction();
        try {
            $role = new Role();
            $role->name = $request->name;
            $role->save();

            if ($request->has('permissions')) {
                $role->syncPermissions($request->permissions);
            }
            DB::commit();

            return Redirect::route('roles.index')->with(['status' => true, 'message' => 'El rol ' . $role->name . ' fue registrado correctamente']);
        } catch (Exception $exc) {
            DB::rollBack();
            return Redirect::route('roles.index')->with(['status' => false, 'message' => 'Existen errores en el formulario.']);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'name' => 'required',
        ]);
        DB::beginTransaction();
        try {
            $role = Role::find($id);
            $role->name = $request->name;
            $role->save();


            if ($request->has('permissions')) {
                $role->syncPermissions($request->permissions);
            } else {
                $role->syncPermissions([]);
            }
            DB::commit();

            return Redirect::route('roles.index')->with(['status' => true, 'message' => 'El rol ' . $role->name . ' fue actualizado correctamente']);
        } catch (Exception $exc) {
            DB::rollBack();
            return Redirect::route('roles.index')->with(['status' => false, 'message' => 'Existen errores en el formulario.']);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
