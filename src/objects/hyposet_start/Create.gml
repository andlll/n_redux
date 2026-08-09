/// gml_Object_hyposet_start_Create_0
// locals: __b__
global.figx = display_get_width();
global.figy = display_get_height();
__b__ = action_if_variable(os_type, 0, 0);
if (__b__) {
    window_set_size(1920, 1040);
    ha1 = window_get_width();
    ha2 = window_get_height();
    surface_resize(application_surface, ha1, ha2);
}
if (os_type == 4) {
    window_set_size(global.figx, global.figy);
}
surface_resize(application_surface, global.figx, global.figy);
view_wview[0] = window_get_width();
__b__ = action_if_variable(os_type, 4, 0);
if (__b__) {
    view_hview[0] = window_get_height();
}
__b__ = action_if_variable(os_type, 0, 0);
if (__b__) {
    view_hview[0] = window_get_height() - 40;
}
view_wport[0] = window_get_width();
__b__ = action_if_variable(os_type, 4, 0);
if (__b__) {
    view_hport[0] = window_get_height();
}
__b__ = action_if_variable(os_type, 0, 0);
if (__b__) {
    view_hport[0] = window_get_height() - 40;
}
