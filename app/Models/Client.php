<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Client extends Model
{
    use HasFactory;
    protected $table = "clients";
    protected $fillable = ['dni', 'full_name', 'cell_phone', 'address', 'email'];

    public function sales(): HasMany
    {
        return $this->hasMany(Sale::class);
    }
}
