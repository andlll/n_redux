/// gml_Object_rainlauncher_Create_0
partRain_sys = part_system_create();
part_system_depth(partRain_sys, -1200);
partRain = part_type_create();
part_type_shape(partRain, 3);
part_type_size(partRain, 0.2, 0.3, 0, 0);
part_type_color2(partRain, 8421376, 16777215);
part_type_alpha2(partRain, 0.5, 0.1);
part_type_gravity(partRain, 0.1, 240);
part_type_speed(partRain, 0.5, 0.5, 0, 0);
part_type_direction(partRain, 210, 290, 0, 1);
part_type_orientation(partRain, 240, 240, 0, 0, 0);
part_type_life(partRain, 360, 380);
partRain_emit = part_emitter_create(partRain_sys);
part_emitter_region(partRain_sys, partRain_emit, -400, 5500, -300, -300, 3, 0);
part_emitter_stream(partRain_sys, partRain_emit, partRain, 15);
if (room_speed * 3 > 0) {
    part_system_update(partRain_sys);
    if (!(!(room_speed * 3 - 1))) goto L413C27C;
}
action_set_alarm(280, 0);

/* ---- flat listing (fallback) ----
// note: unstructured control flow - labels emitted
    partRain_sys = part_system_create();
    part_system_depth(partRain_sys, -1200);
    partRain = part_type_create();
    part_type_shape(partRain, 3);
    part_type_size(partRain, 0.2, 0.3, 0, 0);
    part_type_color2(partRain, 8421376, 16777215);
    part_type_alpha2(partRain, 0.5, 0.1);
    part_type_gravity(partRain, 0.1, 240);
    part_type_speed(partRain, 0.5, 0.5, 0, 0);
    part_type_direction(partRain, 210, 290, 0, 1);
    part_type_orientation(partRain, 240, 240, 0, 0, 0);
    part_type_life(partRain, 360, 380);
    partRain_emit = part_emitter_create(partRain_sys);
    part_emitter_region(partRain_sys, partRain_emit, -400, 5500, -300, -300, 3, 0);
    part_emitter_stream(partRain_sys, partRain_emit, partRain, 15);
    if (room_speed * 3 <= 0) goto L213C2A8;
    part_system_update(partRain_sys);
    if (room_speed * 3 - 1) goto L413C27C;
    action_set_alarm(280, 0);
*/
