<html >
<body>
    <table>
        <thead>
            <tr>
                <th>Producto</th>
                <th>Stock actual</th>
                <th>Categoria</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($products as $product)
            <tr>
                <td>{{ $product->name }}</td>
                <td>{{ $product->quantity }}</td>
                <td>{{ $product->category->name }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>
</body>

</html>