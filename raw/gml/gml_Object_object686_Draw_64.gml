/// gml_Object_object686_Draw_64
// locals: __b__
__b__ = action_if_variable(os_type, 4, 0);
if (__b__) {
    display_set_gui_maximise(2, 2, 0, 0);
}
action_draw_sprite(icone_oriz, 0, 20, -1);
action_font(gotham_mini, 0);
__b__ = action_if_variable(global.hc, 0, 0);
if (__b__) {
    action_color(0);
}
__b__ = action_if_variable(global.hc, 1, 0);
if (__b__) {
    action_color(16777215);
}
with (r12) {
    action_draw_variable(pop, 30, 35);
}
with (r12) {
    action_draw_variable(oil, 142, 35);
}
with (r12) {
    action_draw_variable(ele, 228, 35);
}
with (r12) {
    action_draw_variable(mon, 340, 35);
}
with (r12) {
    action_draw_variable(time, 448, 50);
}
__b__ = action_if_variable(mon, 1, 0);
if (__b__) {
    action_draw_text("Jan", 456, 20);
}
__b__ = action_if_variable(mon, 2, 0);
if (__b__) {
    action_draw_text("Feb", 456, 20);
}
__b__ = action_if_variable(mon, 3, 0);
if (__b__) {
    action_draw_text("Mar", 456, 20);
}
__b__ = action_if_variable(mon, 4, 0);
if (__b__) {
    action_draw_text("Apr", 456, 20);
}
__b__ = action_if_variable(mon, 5, 0);
if (__b__) {
    action_draw_text("May", 456, 20);
}
__b__ = action_if_variable(mon, 6, 0);
if (__b__) {
    action_draw_text("Jun", 456, 20);
}
__b__ = action_if_variable(mon, 7, 0);
if (__b__) {
    action_draw_text("Jul", 456, 20);
}
__b__ = action_if_variable(mon, 8, 0);
if (__b__) {
    action_draw_text("Aug", 456, 20);
}
__b__ = action_if_variable(mon, 9, 0);
if (__b__) {
    action_draw_text("Sep", 456, 20);
}
__b__ = action_if_variable(mon, 10, 0);
if (__b__) {
    action_draw_text("Oct", 456, 20);
}
__b__ = action_if_variable(mon, 11, 0);
if (__b__) {
    action_draw_text("Nov", 456, 20);
}
__b__ = action_if_variable(mon, 12, 0);
if (__b__) {
    action_draw_text("Dec", 456, 20);
}
