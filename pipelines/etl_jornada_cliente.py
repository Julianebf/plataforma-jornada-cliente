import pandas as pd

from quality import (
    validar_pedidos,
    calcular_score_qualidade
)


# =========================
# EXTRACT
# =========================

clientes = pd.read_csv(
    "data/raw/olist_customers_dataset.csv"
)

pedidos = pd.read_csv(
    "data/raw/olist_orders_dataset.csv"
)

pagamentos = pd.read_csv(
    "data/raw/olist_order_payments_dataset.csv"
)

reviews = pd.read_csv(
    "data/raw/olist_order_reviews_dataset.csv"
)


# =========================
# TRANSFORM
# =========================

pedidos_clientes = pedidos.merge(
    clientes,
    on="customer_id",
    how="left"
)

jornada_cliente = pedidos_clientes.merge(
    pagamentos,
    on="order_id",
    how="left"
)

jornada_cliente = jornada_cliente.merge(
    reviews,
    on="order_id",
    how="left"
)


# =========================
# DATAS
# =========================

jornada_cliente["order_purchase_timestamp"] = pd.to_datetime(
    jornada_cliente["order_purchase_timestamp"]
)

jornada_cliente["order_delivered_customer_date"] = pd.to_datetime(
    jornada_cliente["order_delivered_customer_date"]
)


# =========================
# QUALITY
# =========================

regras_qualidade = validar_pedidos(
    jornada_cliente
)

print(regras_qualidade)

score = calcular_score_qualidade(
    regras_qualidade
)

print(f"Score Qualidade: {score}%")


# =========================
# FEATURE ENGINEERING
# =========================

jornada_cliente["tempo_entrega_dias"] = (
    jornada_cliente["order_delivered_customer_date"]
    - jornada_cliente["order_purchase_timestamp"]
).dt.days


# =========================
# SAVE
# =========================

jornada_cliente.to_csv(
    "data/trusted/jornada_cliente_trusted.csv",
    index=False
)

print("Pipeline executado com sucesso!")