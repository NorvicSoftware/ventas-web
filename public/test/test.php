// $category = new Category();
    // $category->name = "Aguas y gaseosas";
    // $category->save();

    // $categories = Category::all();
    // $categories = Category::where('id', '=', 1)->select('name')->get();
    // $categories = Category::where('name', '=', 'Limpieza')->select('id', 'name')->get();

    // $product = new Product();
    // $product->name = "Coca Cola";
    // $product->sale_price = 7;
    // $product->quantity = 50;
    // $product->status = "Activo";
    // $product->category_id = 2;
    // $product->save();

    // $product2 = new Product();
    // $product2->name = "Toallas humedas";
    // $product2->sale_price = 3;
    // $product2->quantity = 20;
    // $product2->status = "Activo";
    // $product2->category_id = 1;
    // $product2->save();

    // $category = Category::where('name', '=', "Aguas y gaseosas")->first();//left join

    // $products = Product::where('category_id', '=', 2)->get();

    // $products = Product::all();

    // $products = DB::table('products')->join('categories', 'categories.id', '=', 'products.category_id')
    // ->select('products.name', 'categories.name as category_name')->get();

    $category = DB::table('categories')->insert(['name' => "Celulares"]);


    return view('test', ['category' => $category])