<?php

namespace App\Http\Controllers\Reports;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Sale;
use Inertia\Inertia;

class TotalSaleController extends Controller
{
    public function list(){
        $sales = Sale::with(['client', 'user', 'products'])->get();
        return Inertia::render('Reports/Sales/List', ['sales' => $sales ]);
    }

    public function search(Request $request)
    {
        try
        {
            $query = Sale::with(['client', 'user', 'products']);
            if($request->client !== ''){
                $query->whereHas('client', function ($query) use ($request) {
                    $query->where('full_name', 'like', '%'. $request->client . '%');
                });
            }
            if($request->user !== ''){
                $query->whereHas('user', function ($query) use ($request) {
                    $query->where('name', 'like', '%'. $request->user . '%');
                });
            }
            $query->whereBetween('sales.sale_date', [$request->init_date, $request->end_date]);
            $sales = $query->get();
            return Inertia::render('Reports/Sales/List', ['status' => true, 'action' => 1, 'message' => 'Ok', 'sales' => $sales]);
        } catch (\Exception $exc){
            return Inertia::render('Reports/Sales/List', ['status' => false, 'action' => 0, 'message' => 'Error al procesar (Servidor)' . $exc->getMessage()]);
        }
    }
}
