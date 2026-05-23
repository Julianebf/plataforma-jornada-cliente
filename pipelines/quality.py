def validar_pedidos(df):

    status_validos = [
        "delivered",
        "shipped",
        "canceled",
        "processing",
        "approved",
        "invoiced",
        "created",
        "unavailable"
    ]

    regras = {
        "order_id_nulo": df["order_id"].isnull().sum(),

        "status_invalido": (
            ~df["order_status"].isin(status_validos)
        ).sum(),

        "datas_invalidas": (
            df["order_delivered_customer_date"]
            < df["order_purchase_timestamp"]
        ).sum()
    }

    return regras


def calcular_score_qualidade(regras):

    total_erros = sum(regras.values())

    if total_erros == 0:
        return 100

    return max(0, 100 - total_erros)