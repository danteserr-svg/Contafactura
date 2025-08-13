-- Script para corregir el plan PROFESIONAL 10 con folios incorrectos
-- Este script debe ejecutarse en la base de datos de Supabase

-- Primero, vamos a ver el estado actual del plan
SELECT * FROM user_plans WHERE plan_name = 'PROFESIONAL 10' AND estatus = 'activo';

-- Actualizar el plan para establecer los folios correctos
UPDATE user_plans 
SET 
  folios_total = 10,
  folios_usados = 0
WHERE 
  plan_name = 'PROFESIONAL 10' 
  AND estatus = 'activo'
  AND folios_total = 0;

-- Verificar que se actualizó correctamente
SELECT * FROM user_plans WHERE plan_name = 'PROFESIONAL 10' AND estatus = 'activo';