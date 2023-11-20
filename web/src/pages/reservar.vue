<template>
    <router-view></router-view>
    <page-panel></page-panel>

    <div class="table-panel tw-flex tw-place-items-center tw-flex-col tw-mt-10">
    <h1 class="tw-underline">{{ $route.meta.title }}</h1>
        <table-view>
            <w-button class="tw-w-20 tw-font-bold" @click="reservePanel = true">
                Reservar
            </w-button> 
        </table-view>
    </div>


    <teleport to="main" class="tw-text-center">
        <w-box float close-hint  v-model="reservePanel" class="tw-text-center tw-font-bold">
             <w-input v-model="tableNumber" class="tw-text-center tw-font-bold"> 
               Digite o número da mesa: 
             </w-input> 
             <w-input v-model="userNumber" class="tw-text-center tw-font-bold"> 
               Digite seu número:
             </w-input> 
             <w-button class="tw-w-11/12 tw-font-bold" @click="reserveTable(tableNumber, userNumber)">
                Ok
            </w-button> 
        </w-box>
    </teleport>  

    <teleport to="main" class="tw-text-center">
        <w-box float close-hint v-model="errorPanel" class="tw-text-center tw-font-bold">
             {{ errorText }}
             <w-button class="tw-w-11/12 tw-font-bold tw-place-items-center" @click="errorPanel = false;">
                Ok
            </w-button> 
        </w-box>
    </teleport>  


</template>

<script setup lang="ts">

       
    const metaStore = useStore('meta'), tableStore = useStore('table'), customerStore = useStore('customer');

    await metaStore.$actions.describe();

    const reservePanel = ref(false), errorPanel = ref(false);
    const tableNumber = ref(0), userNumber = ref(0);
    const errorText = ref("");

    
    onMounted(() => {
        console.log(tableView)
    })
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
        
       if(table == null)
       {
            errorPanel.value = true;
            errorText.value = "Mesa não encontrada!";
            return;
       }
       if(customer == null)
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
    }
</script>