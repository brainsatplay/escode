export const keySeparator = '.'

export const defaultPath = 'default'

export const esSourceKey = '__esmpileSourceBundle'


export const defaultProperties = {
    root: '__', // Includes path
    properties: '__props',

    default: defaultPath,
    operator: '__operator',
    
    children: '__children',
    listeners: {
        value: '__listeners', // Main property

        // Root Properties
        branch: '__branch',
        trigger: '__trigger',
        format: '__format',
    },

    parent: '__parent',
    promise: '__childresolved',

    component: '__component',
    proxy: '__proxy' // Handled by ESMonitor for Listeners
}

export const specialKeys = {

   ...defaultProperties,

    start: '__onconnected', // asked to start
    stop: '__ondisconnected',
    connected: '__connected', // wait until connected
    resolved: '__resolved', // wait until fully resolved
    started: '__started', // wait until started

    element: '__element',
    webcomponents: '__define',
    attributes: '__attributes',

    trigger: '__trigger',
    compose: '__compose',
    apply: '__apply',

    // Internal to Compose
    uri: 'src',
    reference: 'ref',

    childPosition: '__childposition',

    attribute: 'escomponent',
    options: '__options',

    source: '__source',
    path: '__path',

    animate: '__animate',
    states: '__states',

    editor: '__editor',

    original: '__original',

    resize: '__onresize',    
}