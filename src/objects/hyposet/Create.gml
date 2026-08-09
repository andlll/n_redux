/// gml_Object_hyposet_Create_0
// locals: __b__
global.figx = display_get_width();
global.figy = display_get_height();
proto1 = window_get_width();
proto2 = window_get_height();
if (os_type == 4) {
    if (proto1 > proto2) {
        global.upp = 0;
    } else {
        global.upp = 40;
    }
}
if (os_type == 4) {
    window_set_size(global.figx, global.figy);
}
__b__ = action_if_variable(os_type, 4, 0);
if (__b__) {
    view_wview[0] = window_get_width() * 0.5;
    view_hview[0] = window_get_height() * 0.5;
}
__b__ = action_if_variable(os_type, 0, 0);
if (__b__) {
    action_set_cursor(1372, 0);
    view_wview[0] = window_get_width();
    view_hview[0] = window_get_height() - 40;
}
view_wport[0] = window_get_width();
__b__ = action_if_variable(os_type, 4, 0);
if (__b__) {
    view_hport[0] = window_get_height();
}
__b__ = action_if_variable(os_type, 0, 0);
if (__b__) {
    view_hport[0] = window_get_height();
}
