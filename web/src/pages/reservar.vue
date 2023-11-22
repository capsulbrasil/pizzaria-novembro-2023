<template>
    <router-view></router-view>
    <page-panel></page-panel>

    <div class="table-panel tw-flex tw-place-items-center tw-flex-col tw-mt-10">
    <h1 class="tw-underline">{{ $route.meta.title }}</h1>
        <table-view :tables="unreseverdTables">
            <aeria-button class="tw-w-20 tw-font-bold" @click="reservePanel = true">
                Reservar
            </aeria-button> 
        </table-view>
    </div>

    <teleport to="main" class="tw-text-center">
        <aeria-panel float close-hint  v-model="reservePanel" class="tw-text-center tw-font-bold">
             <aeria-input v-model="tableNumber" class="tw-text-center tw-font-bold"> 
               Digite o número da mesa: 
             </aeria-input> 
             <aeria-input v-model="userNumber" class="tw-text-center tw-font-bold"> 
               Digite seu telefone:
             </aeria-input> 
             <div class="tw-flex">
                <aeria-button class="tw-w-1/2 tw-mr-2 tw-font-bold" @click="reserveTable(tableNumber, userNumber)">
                    Ok
                </aeria-button> 
                <aeria-button class="tw-w-1/2 tw-ml-2 tw-font-bold" @click="reservePanel = false">
                    Cancelar    
                </aeria-button> 
             </div>

        </aeria-panel>
    </teleport>  

    <teleport to="main" class="tw-text-center">
        <aeria-panel float close-hint v-model="errorPanel" class="tw-text-center tw-font-bold">
             {{ errorText }}
             <aeria-button class="tw-w-11/12 tw-font-bold tw-place-items-center" @click="errorPanel = false;">
                Ok
            </aeria-button> 
        </aeria-panel>
    </teleport>  


</template>

<script setup lang="ts">

    const metaStore = useStore('meta'), tableStore = useStore('table'), customerStore = useStore('customer');

    await metaStore.$actions.describe();

    const reservePanel = ref(false), errorPanel = ref(false);
    const tableNumber = ref(0), userNumber = ref(0);
    const errorText = ref("");
    

    type TableArray = Array<{
      number: number,
      characteristic: string,
      reserved: boolean
    }>

    async function getUnreservedTables(){

        const request = await fetch('http://127.0.0.1:3000/api/table/get-unreserved', {
        method: 'GET',
        headers: {
            Accept: 'application/json',
        },  
        });

        const data: TableArray = await request.json();

        return data.map(x=>{
        return {
            number: x.number,
            characteristic: x.characteristic,
            reserved: x.reserved
        }
        }).sort((a,b)=>a.number - b.number);
    }
    const unreseverdTables = ref(await getUnreservedTables());

    async function reserveTable(table_number: number, user_number: number)
    {
        reservePanel.value = false;
        
        const customer: object = await customerStore.$actions.get({
            filters:{
                phone_number: user_number
            },
        });

        const table: object = await tableStore.$actions.get({
            filters:{
                number: table_number,
                reserved_by: null
            },
        });
        
       if(Object.keys(table).length == 0)
       {
            errorPanel.value = true;
            errorText.value = "Mesa não encontrada!";
            return;
       }
       if(Object.keys(customer).length == 0)
       {
            errorPanel.value = true;
            errorText.value = "Usuário não encontrado pelo telefone.";
            return;
       }

       tableStore.$actions.insert({
            what: {
                _id: table["_id"],
                reserved: true,
                reserved_by: customer["_id"]
            }
        });

        const tableIndex = unreseverdTables.value.indexOf(unreseverdTables.value.find(x=>x.number == table_number));

        unreseverdTables.value.splice(tableIndex, tableIndex == 0 ? 1 : tableIndex);
    }
</script>