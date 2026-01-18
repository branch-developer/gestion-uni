export interface Pago {
  id: number;
  inscripcion: number;
  curso_nombre: string;
  inscripcion_usuario_nombre: string;
  metodo_pago: 'transferencia' | 'pago_movil';
  referencia?: string;
  monto: number;
  estado: 'pendiente' | 'aprobado' | 'rechazado';
  motivo_rechazo?: string;
  captura_comprobante?: string;
  comprobante_url?: string;
  fecha_pago: string;
  fecha_verificacion?: string;
}

