<?php

namespace App\Http\Controllers;

use App\Models\Provider;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class ProviderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $providers = Provider::all();
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
        ]);

        $provider = new Provider();
        $provider->company = $request->company;
        $provider->contact = $request->contact;
        $provider->cell_phone = $request->cell_phone;
        $provider->address = $request->address;
        $provider->email = $request->email;
        $provider->save();

        return Redirect::route('providers.index');
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
        ]);
        
        $provider = Provider::find($id);
        $provider->company = $request->company;
        $provider->contact = $request->contact;
        $provider->cell_phone = $request->cell_phone;
        $provider->address = $request->address;
        $provider->email = $request->email;
        $provider->save();

        return Redirect::route('providers.index');
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
