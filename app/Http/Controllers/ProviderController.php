<?php

namespace App\Http\Controllers;

use App\Models\Provider;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Illuminate\Support\Facades\Mail;
use App\Mail\ProviderMail;
use Illuminate\Support\Facades\DB;
use Exception;

class ProviderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $providers = Provider::orderBy('company', 'ASC')->get();
        return Inertia::render('Providers/Index', ['providers' => $providers]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Providers/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'company' => 'required|min:3|max:35',
            'contact' => 'required|min:3|max:75',
            'cell_phone' => 'nullable|min:5|max:18',
            'email' => 'nullable|email',
        ]);

        DB::beginTransaction();
        try {
            $provider = new Provider();
            $provider->company = $request->company;
            $provider->contact = $request->contact;
            $provider->cell_phone = $request->cell_phone;
            $provider->address = $request->address;
            $provider->email = $request->email;
            $provider->save();

            DB::commit();
            return Redirect::route('providers.index')->with(['status' => true, 'message' => 'El proveedor ' . $provider->company . ' fue registrado correctamente']);
        } catch (Exception $exc) {
            DB::rollBack();
            return Redirect::route('providers.index')->with(['status' => false, 'message' => 'Existen errores en el formulario.']);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $provider = Provider::find($id);
        return Inertia::render('Providers/Show', ['provider' => $provider]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $provider = Provider::findOrFail($id);
        return Inertia::render('Providers/Edit', ['provider' => $provider]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'company' => 'required|min:3|max:35',
            'contact' => 'required|min:3|max:75',
            'cell_phone' => 'nullable|min:5|max:18',
            'email' => 'nullable|email',
        ]);

        DB::beginTransaction();
        try {
            $provider = Provider::find($id);
            $provider->company = $request->company;
            $provider->contact = $request->contact;
            $provider->cell_phone = $request->cell_phone;
            $provider->address = $request->address;
            $provider->email = $request->email;
            $provider->save();

            if ($provider->email !== '') {
                Mail::to($provider->email)->send(new ProviderMail($provider));
            }

            DB::commit();
            return Redirect::route('providers.index')->with(['status' => true, 'message' => 'El proveedor ' . $provider->company . ' fue actualizado correctamente']);
        } catch (Exception $exc) {
            DB::rollBack();
            return Redirect::route('providers.index')->with(['status' => false, 'message' => 'Existen errores en el formulario.']);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $provider = Provider::find($id);
        $provider->delete();
        return Redirect::route('providers.index');
    }
}
