<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        table {
            min-width: 100%;
            border-collapse: collapse;
        }

        thead {
            background-color: #6B7289;
            color: #FFFFFF;
            text-transform: uppercase;
        }

        td {
            border: 1px solid;
            border-color: #6B7289;
        }

        img {
            width: 64px;
            height: 64px;
        }
        h1 {
            color: #3888E8;
        }
    </style>
</head>

<body>
    <div>
        <img src="img/imagen-por-defecto.png" />
        <h1>REPORTE DE STOCK DE PRODUCTOS</h1>
    </div>

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