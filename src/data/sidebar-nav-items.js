export default function() {
  return [
    {
      title: "Blog Dashboard",
      to: "/blog-overview",
      htmlBefore: '<i class="material-icons">edit</i>'
    },
    {
      title: "Blog Posts",
      htmlBefore: '<i class="material-icons">vertical_split</i>',
      to: "/blog-posts"
    },
    {
      title: "Add New Post",
      htmlBefore: '<i class="material-icons">note_add</i>',
      to: "/add-new-post"
    },
    {
      title: "Forms & Components",
      htmlBefore: '<i class="material-icons">view_module</i>',
      to: "/components-overview"
    },
    {
      title: "Tables",
      htmlBefore: '<i class="material-icons">table_chart</i>',
      to: "/tables"
    },
    {
      title: "User Profile",
      htmlBefore: '<i class="material-icons">person</i>',
      to: "/user-profile-lite"
    },
    {
      title: "Errors",
      htmlBefore: '<i class="material-icons">error</i>',
      to: "/errors"
    },
    {
      title: "Tela",
      htmlBefore: '<i class="material-icons">receipt</i>',
      htmlAfter: '<i class="material-icons">expand_more</i>',
      links: [
        {
          title: "Ingresar tela",
          to: "/ingresar-tela",
          icon: '<i class="material-icons">add</i>'
        },
        {
          title: "Stock de tela",
          to: "/ver-telas",
          icon: '<i class="material-icons">view_module</i>'
        },
        {
          title: "Imprimir remito",
          to: "/imprimir-remito",
          icon: '<i class="material-icons">print</i>'
        }
      ]
    },
    {
      title: "Corte",
      htmlBefore: '<i class="fa fa-scissors" aria-hidden="true"></i>',
      htmlAfter: '<i class="material-icons">expand_more</i>',
      links: [
        {
          title: "Realizar corte",
          to: "/realizar-corte",
          icon: '<i class="material-icons">add</i>'
        }
        // {
        //   title: "Stock de tela",
        //   to: "/ver-telas",
        //   icon: '<i class="material-icons">view_module</i>'
        // },
        // {
        //   title: "Imprimir remito",
        //   to: "/imprimir-remito",
        //   icon: '<i class="material-icons">print</i>'
        // }
      ]
    },
    {
      title: "Taller",
      htmlBefore: '<i class="fas fa-industry"></i>',
      htmlAfter: '<i class="material-icons">expand_more</i>',
      links: [
        {
          title: "Enviar taller",
          to: "/enviar-taller",
          icon: '<i class="material-icons">add</i>'
        }
        // {
        //   title: "Stock de tela",
        //   to: "/ver-telas",
        //   icon: '<i class="material-icons">view_module</i>'
        // },
        // {
        //   title: "Imprimir remito",
        //   to: "/imprimir-remito",
        //   icon: '<i class="material-icons">print</i>'
        // }
      ]
    },
    {
      title: "Plancha",
      htmlBefore: '<i class="fas fa-thermometer-three-quarters"></i>',
      htmlAfter: '<i class="material-icons">expand_more</i>',
      links: [
        {
          title: "Enviar a plancha",
          to: "/enviar-plancha",
          icon: '<i class="material-icons">add</i>'
        }
        // {
        //   title: "Stock de tela",
        //   to: "/ver-telas",
        //   icon: '<i class="material-icons">view_module</i>'
        // },
        // {
        //   title: "Imprimir remito",
        //   to: "/imprimir-remito",
        //   icon: '<i class="material-icons">print</i>'
        // }
      ]
    }
  ];
}
