// Script para corregir el plan PROFESIONAL 10 desde la consola del navegador
// Ejecuta este código en la consola del navegador (F12) mientras estás en la aplicación

async function fixProfesionalPlan() {
  try {
    console.log('Iniciando corrección del plan PROFESIONAL 10...');
    
    // Obtener el usuario actual
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError) throw userError;
    if (!user) throw new Error('Usuario no autenticado');
    
    console.log('Usuario encontrado:', user.id);
    
    // Buscar el plan PROFESIONAL 10 con problemas
    const { data: plans, error: selectError } = await supabase
      .from('user_plans')
      .select('*')
      .eq('user_id', user.id)
      .eq('plan_name', 'PROFESIONAL 10')
      .eq('estatus', 'activo');
    
    if (selectError) throw selectError;
    
    console.log('Planes encontrados:', plans);
    
    if (!plans || plans.length === 0) {
      console.log('No se encontró el plan PROFESIONAL 10');
      return;
    }
    
    const plan = plans[0];
    console.log('Plan actual:', plan);
    
    if (plan.folios_total === 0) {
      console.log('Corrigiendo folios del plan...');
      
      // Actualizar el plan con los folios correctos
      const { data: updatedPlan, error: updateError } = await supabase
        .from('user_plans')
        .update({
          folios_total: 10,
          folios_usados: 0
        })
        .eq('id', plan.id)
        .select();
      
      if (updateError) throw updateError;
      
      console.log('Plan corregido exitosamente:', updatedPlan);
      
      // Disparar evento para actualizar el header
      window.dispatchEvent(new CustomEvent('foliosUpdated'));
      
      alert('¡Plan corregido exitosamente! Recarga la página para ver los cambios.');
    } else {
      console.log('El plan ya tiene los folios correctos:', plan.folios_total);
    }
    
  } catch (error) {
    console.error('Error al corregir el plan:', error);
    alert('Error al corregir el plan: ' + error.message);
  }
}

// Ejecutar la función
fixProfesionalPlan();