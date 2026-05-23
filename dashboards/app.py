import streamlit as st
import pandas as pd


# =========================
# LOAD
# =========================

df = pd.read_csv(
    "data/trusted/jornada_cliente_trusted.csv"
)


# =========================
# TITULO
# =========================

st.title("Dashboard de Governança e Qualidade de Dados")

st.markdown("""
Monitoramento da qualidade, integridade e métricas operacionais
da jornada do cliente.
""")


# =========================
# KPIs
# =========================

total_registros = len(df)

nulos = df.isnull().sum().sum()

pedidos_entregues = (
    df["order_status"] == "delivered"
).sum()

score_qualidade = 100


col1, col2, col3, col4 = st.columns(4)

col1.metric(
    "Total Registros",
    total_registros
)

col2.metric(
    "Valores Nulos",
    nulos
)

col3.metric(
    "Pedidos Entregues",
    pedidos_entregues
)

col4.metric(
    "Score Qualidade",
    f"{score_qualidade}%"
)


# =========================
# STATUS PEDIDOS
# =========================

st.subheader("Status dos Pedidos")

status = df["order_status"].value_counts()

st.bar_chart(status)


# =========================
# TIPOS PAGAMENTO
# =========================

st.subheader("Tipos de Pagamento")

pagamentos = df["payment_type"].value_counts()

st.bar_chart(pagamentos)


# =========================
# REVIEW SCORE
# =========================

st.subheader("Satisfação dos Clientes")

reviews = df["review_score"].value_counts().sort_index()

st.bar_chart(reviews)


# =========================
# DADOS
# =========================

st.subheader("Base Trusted")

st.dataframe(df.head(50))