<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\MorphOne;

class Product extends Model
{
    use HasFactory;
    protected  $table = "products";

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function buys(): BelongsToMany
    {
        return $this->belongsToMany(Buy::class);
    }

    public function imagen() : MorphOne 
    {
        return $this->morphOne(Image::class, 'imageable');
    }
}
