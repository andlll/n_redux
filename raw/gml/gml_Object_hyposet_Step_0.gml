/// gml_Object_hyposet_Step_0
// locals: __b__
proto1 = window_get_width();
proto2 = window_get_height();
if (os_type == 4) {
    if (proto1 > proto2) {
        global.upp = 0;
    } else {
        global.upp = 0;
    }
}
__b__ = action_if_number(156, 0, 0);
if (__b__) {
    global.sca = 1;
}
__b__ = action_if_variable(os_type, 4, 0);
if (__b__) {
    view_wview[0] = window_get_width() * global.sca * 0.5;
    view_hview[0] = window_get_height() * global.sca * 0.5;
    view_wport[0] = window_get_width();
    view_hport[0] = window_get_height();
}
__b__ = action_if_variable(os_type, 0, 0);
if (__b__) {
    view_wview[0] = window_get_width() * global.sca;
    view_hview[0] = window_get_height() * global.sca;
    view_wport[0] = window_get_width();
    view_hport[0] = window_get_height();
}
__b__ = action_if_variable(os_type, 0, 0);
if (__b__) {
    if (view_wview[0] < 1280) {
        window_set_size(1280, 720);
    }
    if (view_hview[0] < 720) {
        window_set_size(1280, 720);
    }
    surface_resize(application_surface, proto1, proto2);
}
