<template>
  <div class="q-pa-md">
    <header-page :titlePage="'Regra de Sinalização'" />
    <div class="q-pl-md">
      <q-breadcrumbs class="text-black" active-color="primary">
        <template v-slot:separator>
          <q-icon size="1.2em" name="arrow_forward" color="black" />
        </template>
        <q-breadcrumbs-el label="Início" icon="home" :to="{ name: 'dashboard' }" />
        <q-breadcrumbs-el label="Pesquisar" icon="search" />
      </q-breadcrumbs>
    </div>
    <div class="q-pa-md">
      <q-card class="my-card">
        <filtro-codigo-transacao ref="filtroCodigoTransacao"
          @pesquisar="pesquisar"
          @limpar="limpar" />
        <div style="margin-left: 1%; margin-bottom: 1%;">
          <q-btn class="bg-primary text-white" flat label="Definir em Lote" @click="editarSelecionados"
            :disable="selected.length === 0"
          />
          <q-btn style="margin-left: 1%;" class="bg-red text-white" flat label="Redefinir em Lote"
            @click="abrirModalRedefinir"
            :disable="selected.length === 0"
          />
        </div>
        <q-table
          @request="onRequest"
          :pagination.sync="pagination"
          :data="data"
          :columns="columns"
          row-key="id"
          selection="multiple"
          :selected.sync="selected"
          :rows-per-page-options="rowsPerPageOptions">
          <template v-slot:body-cell-icon="props">
            <q-td :props="props">
              <q-icon v-if="props.row.cadastrado === 'SIM'" name="task_alt" color="green" size="sm" />
              <q-icon v-else name="do_disturb_alt" color="red" size="sm" />
            </q-td>
          </template>
          <template v-slot:body-cell-acoes="props">
            <q-td :props="props">
              <q-btn
                round dense
                color="primary"
                icon="edit"
                class="q-mr-xs"
                title="Editar"
                @click="editar(props.row)" />
              <q-btn
                round dense
                color="red-8"
                icon="remove"
                class="q-mr-xs"
                title="Excluir"
                @click="abrirModalExclusao(props.row)" />
            </q-td>
          </template>
        </q-table>
        <modal-regra-sinalizacao
          :showModal="showModal"
          :data="metadado"
          @cancelar="cancelar"
          @salvar="salvar" />
        <modal-exclusao
          :showModal="showModalExclusao"
          :itens="selected"
          @fechar="cancelar"
          @confirmar="excluir" />
          <modal-redefinir
            :showModal="showModalRedefinir"
            :itens="selected"
            @fechar="cancelar"
            @confirmar="confirmarRedefinir" />
      </q-card>
    </div>
  </div>
</template>