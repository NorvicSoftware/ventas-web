<?php

namespace App\Http\Controllers;

use App\Models\Sale;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use App\Models\Client;

class SaleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $sales = Sale::all();
        return Inertia::render('Sales/Index', ['sales' => $sales]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Sales/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        $client = Client::where('dni', '=', $request->dni)->first();

        if (!$client) {
            $client = new Client();
            $client->dni = $request->dni;
            $client->full_name = $request->client_name;
            $client->save();
        }

        $sale = new Sale();
        $sale->sale_date = now();
        $sale->client_id = $client->id;
        $sale->user_id = auth()->id();
        $sale->save();


        foreach($request->products as $product){
            $sale->products()->attach($product['id'], ['quantity' => $product['quantity'], 'sale_price' => $product['sale_price']]);
        }
        

        return Redirect::route('dashboard');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $sale = Sale::find($id);
        return Inertia::render('Sales/Show', ['sale' => $sale]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $sale = Sale::findOrFail($id);
        return Inertia::render('Sales/Edit', ['sale' => $sale]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $sale = Sale::find($id);
        $sale->sale_date = $request->sale_date;
        $sale->client_id = $request->client_id;
        $sale->user_id = $request->user_id;
        $sale->save();

        return Redirect::route('sales.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $sale = Sale::find($id);
        $sale->delete();
        return Redirect::route('sales.index');
    }
}
