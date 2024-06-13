<?php

namespace App\Http\Controllers;

use App\Models\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class ClientController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $clients = Client::all();
        return Inertia::render('Clients/Index', ['clients' => $clients]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Clients/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'dni' => 'required',
            'full_name' => 'required',
        ]);
        $client = new Client();
        $client->dni = $request->dni;
        $client->full_name = $request->full_name;
        $client->cell_phone = $request->cell_phone;
        $client->address = $request->address;
        $client->save();

        return Redirect::route('clients.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $client = Client::find($id);
        return Inertia::render('Client/Show', ['client' => $client]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $client = Client::findOrFail($id);
        return Inertia::render('Clients/Edit', ['client' => $client]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $client = Client::find($id);
        $client->dni = $request->dni;
        $client->full_name = $request->full_name;
        $client->cell_phone = $request->cell_phone;
        $client->address = $request->address;
        $client->save();

        return Redirect::route('clients.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $client = Client::find($id);
        $client->delete();
        return Redirect::route('clients.index');
    }
}
