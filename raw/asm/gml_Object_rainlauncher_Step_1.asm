// gml_Object_rainlauncher_Step_1  locals=1 args=0 len=36
// locals: arguments
00000000: call os_is_paused(argc=0)
00000008: conv.v.b
0000000C: bf 0x213C300
00000010: push.v partRain_sys
00000018: call part_system_destroy(argc=1)
00000020: popz