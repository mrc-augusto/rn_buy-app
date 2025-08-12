/**
 * Enum que define os possíveis status dos itens da lista de compras
 * PENDING: Item que ainda precisa ser comprado
 * DONE: Item que já foi comprado
 */
export enum FilterStatus{
  PENDING = 'pending', // Status para itens pendentes
  DONE = 'done'        // Status para itens concluídos
}