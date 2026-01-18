import { Routes } from '@angular/router';
import { PublicLayout } from './layouts/public-layout/public-layout';
import { DashboardLayout} from './layouts/dashboard-layout/dashboard-layout';
import { NotificacionComponent } from './shared/notificacion/notificacion';
import { AuthGuard } from './core/auth/auth-guard';

export const routes: Routes = [
  // Layout público
  {
    path: '',
    component: PublicLayout,
    children: [
      {
        path: '',
        loadComponent: () => import('./public/index/index').then(m => m.IndexComponent)
      },
      {
        path: 'login',
        loadComponent: () => import('./core/auth/login/login').then(m => m.LoginComponent)
      },
      {
        path: 'register',
        loadComponent: () => import('./core/auth/register/register').then(m => m.Register)
      },
      {
        path: 'contacto',
        loadComponent: () => import('./public/contacto/contacto').then(m => m.ContactoComponent)
      },
      {
        path: 'cursos',
        loadComponent: () => import('./public/cursos-publicos/cursos').then(m => m.CursosComponent)
      },
      {
        path: 'inscripcion',
        loadComponent: () => import('./public/inscripcion/inscripcion').then(m => m.InscripcionComponent)
      },
      {
        path: 'sobrenosotros',
        loadComponent: () => import('./public/sobrenosotros/sobrenosotros').then(m => m.SobrenosotrosComponent)
      }
    ]
  },

  // Layout dashboard (usuarios logueados)
  {
    path: 'dashboard',
    component: DashboardLayout,
    canActivate: [AuthGuard],
    children: [
      // Perfil unificado
      {
        path: 'perfil',
        loadComponent: () => import('./dashboard/usuarios/perfil/perfil').then(m => m.PerfilComponent)
      },
      {
        path: 'perfil-alumno',
        loadComponent: () => import('./dashboard/usuarios/perfil-alumno/perfil-alumno').then(m => m.PerfilAlumnoComponent)
      },
      {
        path: 'perfil-profesor',
        loadComponent: () => import('./dashboard/usuarios/perfil-profesor/perfil-profesor').then(m => m.PerfilProfesorComponent)
      },
      {
        path: 'perfil-admin-c',
        loadComponent: () => import('./dashboard/usuarios/perfil-admin-c/perfil-admin-c').then(m => m.PerfilAdminCComponent)
      },
      {
        path: 'perfil-admin-p',
        loadComponent: () => import('./dashboard/usuarios/perfil-admin-p/perfil-admin-p').then(m => m.PerfilAdminPComponent)
      },

      // Cursos
      {
        path: 'mis-cursos',
        loadComponent: () => import('./dashboard/cursos/mis-cursos/mis-cursos').then(m => m.MisCursosComponent)
      },
      {
        path: 'cursos-disponibles',
        loadComponent: () => import('./dashboard/cursos/cursos-disponibles/cursos-disponibles.component').then(m => m.CursosDisponiblesComponent)
      },
      {
        path: 'detalle-curso/:id',
        loadComponent: () => import('./dashboard/cursos/detalle-curso/detalle-curso.component').then(m => m.DetalleCursoComponent)
      },
      {
        path: 'crear-curso',
        loadComponent: () => import('./dashboard/cursos/crear-curso/crear-curso').then(m => m.CrearCursoComponent)
      },
      {
        path: 'editar-curso/:id',
        loadComponent: () => import('./dashboard/cursos/editar-curso/editar-curso').then(m => m.EditarCursoComponent)
      },

      // Inscripciones
      {
        path: 'inscripciones/inscripcion-form/:cursoId',
        loadComponent: () => import('./dashboard/inscripciones/inscripcion-form/inscripcion-form').then(m => m.InscripcionForm)
      },
      {
        path: 'inscripciones/inscripciones-list',
        loadComponent: () => import('./dashboard/inscripciones/inscripciones-list/inscripciones-list').then(m => m.InscripcionesList)
      },

      // Lecciones
      {
      path: 'curso/detalle-leccion/:leccionId',
      loadComponent: () => import('./dashboard/cursos/detalle-leccion/detalle-leccion').then(m => m.DetalleLeccion),
      },
      {
      path: 'curso/lecciones',
      loadComponent: () => import('./dashboard/cursos/lecciones/lecciones').then(m => m.LeccionesComponent),
      },
      {
      path: 'curso/crear-leccion/:cursoId',
      loadComponent: () => import('./dashboard/cursos/crear-leccion/crear-leccion').then(m => m.CrearLeccion),
      },

      // Evaluaciones
      {
        path: 'evaluaciones/crear',
        loadComponent: () => import('./dashboard/evaluaciones/crear-evaluacion/crear-evaluacion').then(m => m.CrearEvaluacion)
      },
      {
        path: 'evaluaciones/responder',
        loadComponent: () => import('./dashboard/evaluaciones/responder-evaluacion/responder-evaluacion').then(m => m.ResponderEvaluacion)
      },
      {
        path: 'evaluaciones/calificaciones',
        loadComponent: () => import('./dashboard/evaluaciones/calificaciones/calificaciones').then(m => m.Calificaciones)
      },
      {
        path: 'evaluaciones/detalle/:id',
        loadComponent: () => import('./dashboard/evaluaciones/detalle-evaluacion/detalle-evaluacion').then(m => m.DetalleEvaluacion)
      },


      // Pagos
      {
        path: 'pagos/subir-comprobante/:id',
        loadComponent: () => import('./dashboard/pagos/subir-comprobante/subir-comprobante').then(m => m.SubirComprobante)
      },
      {
        path: 'pagos/pendientes',
        loadComponent: () => import('./dashboard/pagos/pagos-pendientes/pagos-pendientes').then(m => m.PagosPendientes)
      },
      {
        path: 'pagos/historial',
        loadComponent: () => import('./dashboard/pagos/historial-pagos/historial-pagos').then(m => m.HistorialPagos)
      },

      // Gestión de usuarios (solo accesible para AdminC)
      {
        path: 'usuarios',
        loadComponent: () => import('./dashboard/usuarios/gestion/usuarios-list/usuarios-list').then(m => m.UsuariosListComponent)
      },
      {
        path: 'usuarios/crear',
        loadComponent: () => import('./dashboard/usuarios/gestion/usuarios-form/usuarios-form').then(m => m.UsuariosFormComponent)
      },
      {
        path: 'usuarios/editar/:id',
        loadComponent: () => import('./dashboard/usuarios/gestion/usuarios-form/usuarios-form').then(m => m.UsuariosFormComponent)
      }

    ]
  },

  // Redirección por defecto
  { path: '**', redirectTo: '' }
];
