import { lazy } from 'react';
import Locations from '../components/locations/Locations';
import ExternalLinks from '../components/externallinks/LinksForm';
const AnalyticsDashboards = lazy(() => import('../pages/dashboard/Analytics'));
const Sessions = lazy(() => import('../components/sessions/Sessions'));
const NewLesson = lazy(() => import('../components/lessons/NewLesson'));
const Lessons = lazy(() => import('../components/lessons/Lessons'));
const UsersDashBoard = lazy(() => import('../components/dashboard/user/UserDashBoard'));
const AdminDashboard = lazy(() => import('../components/admin/AdminDashboardPage'));
const ShoppingCart = lazy(() => import('../components/shoppingcart/Header'));
const Checkout = lazy(() => import('../components/shoppingcart/Checkout'));
const ChatApp = lazy(() => import('../components/messages'));
const CommentsCreatedBy = lazy(() => import('../components/comments/CommentsCreatedBy'));
const CommentsByEntity = lazy(() => import('../components/comments/CommentsByEntity'));
const Surveys = lazy(() => import('../components/surveys/Surveys'));
const NewSurvey = lazy(() => import('../components/surveys/NewSurvey'));
const NewsletterTemplates = lazy(() => import('../components/newslettertemplates/NewsletterTemplates'));
const Inventory = lazy(() => import('../components/inventory/Inventory'));
const NewInventory = lazy(() => import('../components/inventory/AddInventory'));
const UpdateInventory = lazy(() => import('../components/inventory/AddInventory'));
const BlogsAdmin = lazy(() => import('../components/blogs/blogsadmin/BlogsAdmin'));
const AddPost = lazy(() => import('../components/blogs/blogsadmin/AddPost'));
const WorkShopRequest = lazy(() => import('../components/workshoprequest'));
const WorkShopRequestOne = lazy(() => import('../components/workshoprequest/WorkShopRequestForm'));
const CreateWorkshop = lazy(() => import('../components/workshops/WorkShopForm'));
const WorkShops = lazy(() => import('../components/workshops/WorkShopPage'));
const Subscribers = lazy(() => import('../components/newslettersubscriptions/Subscribers'));
const StripeCheckout = lazy(() => import('../components/payments/StripeCheckout'));
const MySurveys = lazy(() => import('../components/surveys/MySurveys'));
const PageNotFound = lazy(() => import('../pages/error/PageNotFound'));
const PdfExample = lazy(() => import('../components/pdf/Example'))
const ZoomHostLanding = lazy(() => import('../components/zoom/ZoomHostLanding'));
const ZoomStream = lazy(() => import('../components/zoom/ZoomStream'));

const WorkShopRequestTwo = lazy(() => import('../components/workshoprequest/WorkShopRequestStatus'));

const NewNewsletterTemplate = lazy(() => import('../components/newslettertemplates/NewNewsletterTemplate'));
const dashboardRoutes = [
    {
        path: '/dashboard',
        name: 'Dashboards',
        icon: 'uil-home-alt',
        header: 'Navigation',
        children: [
            {
                path: '/dashboard/admin',
                name: 'AdminDashboard',
                element: AdminDashboard,
                roles: ['Admin'],
                exact: true,
                isAnonymous: false,
            },
            {
                path: '/dashboard/analytics',
                name: 'Analytics',
                element: AnalyticsDashboards,
                roles: ['Admin'],
                exact: true,
                isAnonymous: false,
            },
            {
                path: '/dashboard',
                name: 'UserDashBoard',
                element: UsersDashBoard,
                roles: ['User', 'Leader'],
                exact: true,
                isAnonymous: false,
            },
        ],
    },
];

const messages = [
    {
        path: '/chat',
        name: 'ChatApp',
        exact: true,
        element: ChatApp,
        roles: [],
        isAnonymous: false,
    },
];

const comments = [
    {
        path: '/comments/createdby',
        name: 'CommentsCreatedBy',
        exact: true,
        element: CommentsCreatedBy,
        roles: [],
        isAnonymous: false,
    },
    {
        path: '/comments/entity',
        name: 'CommentsByEntity',
        exact: true,
        element: CommentsByEntity,
        roles: [],
        isAnonymous: false,
    },
];

const test = [
    {
        path: '/test',
        name: 'Test',
        exact: true,
        element: AnalyticsDashboards,
        roles: ['Fail'],
        isAnonymous: false,
    },
    {
        path: '/secured',
        name: 'A Secured Route',
        exact: true,
        element: AnalyticsDashboards,
        roles: ['Fail'],
        isAnonymous: false,
    },
    {
        path: '/secured2',
        name: 'A Secured Route',
        exact: true,
        element: AnalyticsDashboards,
        roles: ['Admin'],
        isAnonymous: false,
    },
];

const lessonRoutes = [
    {
        path: '/lessons',
        name: 'Lessons',
        exact: true,
        element: Lessons,
        roles: ['User'],
        isAnonymous: false,
        children: [
            {
                path: '/lessons/new',
                name: 'New lesson',
                element: NewLesson,
                roles: ['User'],
                exact: true,
                isAnonymous: false,
            },
            {
                path: '/lessons/creator',
                name: 'User Lessons',
                element: Lessons,
                roles: ['User'],
                exact: true,
                isAnonymous: false,
            },
        ],
    },
];

const locationRoutes = [
    {
        path: '/locations',
        name: 'Locations',
        exact: true,
        element: Locations,
        roles: ['User', 'Admin'],
        isAnonymous: false,
    },
];

const newsletterTemplatesRoutes = [
    {
        path: '/newsletter/templates',
        name: 'Newsletter Template Cards',
        element: NewsletterTemplates,
        roles: ['Admin', 'Developer'],
        exact: true,
        isAnonymous: false,
        children: [
            {
                path: '/newsletter/templates/new',
                name: 'New Newsletter Template',
                element: NewNewsletterTemplate,
                roles: ['Admin', 'Developer'],
                exact: true,
                isAnonymous: false,
            },
        ],
    },
];

const surveyRoutes = [
    {
        path: '/surveys',
        name: 'Surveys',
        exact: true,
        element: Surveys,
        roles: ['Admin'],
        isAnonymous: false,
        children: [
            {
                path: '/surveys/create',
                name: 'Create A Survey',
                exact: true,
                element: NewSurvey,
                roles: ['Admin'],
                isAnonymous: false,
            },
            {
                path: '/surveys/:id/edit',
                name: 'EditSurvey',
                exact: true,
                element: NewSurvey,
                roles: ['Admin'],
                isAnonymous: false,
            },
            {
                path: '/user/surveys',
                name: 'My Surveys',
                exact: true,
                element: MySurveys,
                roles: ['User', 'Admin'],
                isAnonymous: false,
            },
        ],
    },
];

const errorRoutes = [
    {
        path: '*',
        name: 'Error - 404',
        element: PageNotFound,
        roles: [],
        exact: true,
        isAnonymous: false,
    },
];

const externalLinksRoutes = [
    {
        path: '/links',
        name: 'External Links',
        element: ExternalLinks,
        roles: [], //this will be "Admin", "Developer", "User"
        exact: true,
        isAnonymous: false,
    },
];

const sessions = [
    {
        path: '/workshops/:workshopId/sessions',
        name: 'Sessions',
        element: Sessions,
        roles: ['Admin', 'Developer'],
        exact: true,
        isAnonymous: false,
    },
];

const blogsadminRoutes = [
    {
        path: '/blogsadmin',
        name: 'BlogsAdmin',
        exact: true,
        element: BlogsAdmin,
        roles: ['User', 'Admin'],
        isAnonymous: false,
        children: [
            {
                path: '/blogsadmin/new',
                name: 'New Post',
                element: AddPost,
                roles: [],
                exact: true,
                isAnonymous: false,
            },
        ],
    },
];

const shoppingCart = [
    {
        path: '/cart',
        name: 'Shopping Cart',
        element: ShoppingCart,
        roles: ['Admin', 'Developer'],
        exact: true,
        isAnonymous: false,
        children: [
            {
                path: '/cart/checkout/:cartId',
                name: 'Checkout',
                element: Checkout,
                roles: ['Admin', 'Developer'],
                exact: true,
                isAnonymous: false,
            },
        ],
    },
];

const inventory = [
    {
        path: '/inventory',
        name: 'Inventory',
        element: Inventory,
        roles: ['Admin'],
        exact: true,
        isAnonymous: false,
        children: [
            {
                path: '/inventory/add',
                name: 'Add Inventory',
                exact: true,
                element: NewInventory,
                roles: ['Admin'],
                isAnonymous: false,
            },
            {
                path: '/inventory/edit/:id',
                name: 'Update Inventory',
                element: UpdateInventory,
                roles: ['Admin'],
                exact: true,
                isAnonymous: false,
            },
        ],
    },
];

const workshops = [
    {
        path: '/workshops',
        name: 'workshops',
        exact: true,
        element: WorkShops,
        roles: ['User', 'Admin'],
        isAnonymous: false,
        children: [
            {
                path: '/workshops/form',
                name: 'workshop form',
                exact: true,
                element: CreateWorkshop,
                roles: ['Admin'],
                isAnonymous: false,
            },
        ],
    },
];

const workShopRequestRoutes= [
{
    path: '/workshoprequest',
    name: 'workshoprequest',
    exact: true,
    element: WorkShopRequest,
    roles: [],
    isAnonymous: false,
},
{
    path: '/workshoprequestform',
    name: 'WorkShopRequestForm',
    exact: true,
    element: WorkShopRequestOne,
    roles: [],
    isAnonymous: false,
}, 
{
    path: '/workshoprequeststatus',
    name: 'WorkShopRequestStatus',
    exact: true,
    element: WorkShopRequestTwo,
    roles: [],
    isAnonymous: false,
}, 

]









const zoomRoutes = [
    {
        path: '/zoomhost',
        name: 'ZoomHostLanding',
        element: ZoomHostLanding,
        roles: ['Admin'],
        exact: true,
        isAnonymous: false,
    },
    {
        path: '/zoomstream',
        name: 'ZoomStream',
        element: ZoomStream,
        roles: ['Admin'],
        exact: true,
        isAnonymous: false,
    },
];

const payments = [
    {
        path: '/checkout',
        name: 'Stripe Checkout',
        element: StripeCheckout,
        roles: ['Admin', 'Developer'],
        exact: true,
        isAnonymous: false,
    },
];

const subscribers = [
    {
        path: '/subscribers',
        name: 'Subscribers',
        element: Subscribers,
        roles: ['Admin', 'Developer'],
        exact: true,
        isAnonymous: false,
    },
];

const pdfExample = [
    {
        path: '/pdfexample',
        name: 'Example',
        element: PdfExample,
        roles: ['Admin', 'Developer'],
        exact: true,
        isAnonymous: false,
    },
];

const allRoutes = [
    ...dashboardRoutes,
    ...test,
    ...errorRoutes,
    ...externalLinksRoutes,
    ...lessonRoutes,
    ...locationRoutes,
    ...sessions,
    ...blogsadminRoutes,
    ...shoppingCart,
    ...comments,
    ...surveyRoutes,
    ...newsletterTemplatesRoutes,
    ...inventory,
    ...surveyRoutes,
    ...payments,
    ...workShopRequestRoutes,
    ...workshops,
    ...zoomRoutes,
    ...subscribers,
    ...pdfExample,

    ...messages,
];

export default allRoutes;
