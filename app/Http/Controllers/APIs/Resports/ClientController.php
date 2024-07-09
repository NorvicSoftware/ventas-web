<?php

namespace App\Http\Controllers\APIs\Resports;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Client;

class ClientController extends Controller
{
    public function list() {
        $clients = Client::all();
        return response()->json($clients);
    }
}
