// gml_Object_rainlauncher_Create_0  locals=1 args=0 len=772
// locals: arguments
00000000: call part_system_create(argc=0)
00000008: pop.v.v partRain_sys
00000010: push.imm.e -1200
00000014: conv.i.v
00000018: push.v partRain_sys
00000020: call part_system_depth(argc=2)
00000028: popz
0000002C: call part_type_create(argc=0)
00000034: pop.v.v partRain
0000003C: push.imm.e 3
00000040: conv.i.v
00000044: push.v partRain
0000004C: call part_type_shape(argc=2)
00000054: popz
00000058: push.imm.e 0
0000005C: conv.i.v
00000060: push.imm.e 0
00000064: conv.i.v
00000068: push.d 0.3
00000074: conv.d.v
00000078: push.d 0.2
00000084: conv.d.v
00000088: push.v partRain
00000090: call part_type_size(argc=5)
00000098: popz
0000009C: push.i 16777215
000000A4: conv.i.v
000000A8: push.i 8421376
000000B0: conv.i.v
000000B4: push.v partRain
000000BC: call part_type_color2(argc=3)
000000C4: popz
000000C8: push.d 0.1
000000D4: conv.d.v
000000D8: push.d 0.5
000000E4: conv.d.v
000000E8: push.v partRain
000000F0: call part_type_alpha2(argc=3)
000000F8: popz
000000FC: push.imm.e 240
00000100: conv.i.v
00000104: push.d 0.1
00000110: conv.d.v
00000114: push.v partRain
0000011C: call part_type_gravity(argc=3)
00000124: popz
00000128: push.imm.e 0
0000012C: conv.i.v
00000130: push.imm.e 0
00000134: conv.i.v
00000138: push.d 0.5
00000144: conv.d.v
00000148: push.d 0.5
00000154: conv.d.v
00000158: push.v partRain
00000160: call part_type_speed(argc=5)
00000168: popz
0000016C: push.imm.e 1
00000170: conv.i.v
00000174: push.imm.e 0
00000178: conv.i.v
0000017C: push.imm.e 290
00000180: conv.i.v
00000184: push.imm.e 210
00000188: conv.i.v
0000018C: push.v partRain
00000194: call part_type_direction(argc=5)
0000019C: popz
000001A0: push.imm.e 0
000001A4: conv.i.v
000001A8: push.imm.e 0
000001AC: conv.i.v
000001B0: push.imm.e 0
000001B4: conv.i.v
000001B8: push.imm.e 240
000001BC: conv.i.v
000001C0: push.imm.e 240
000001C4: conv.i.v
000001C8: push.v partRain
000001D0: call part_type_orientation(argc=6)
000001D8: popz
000001DC: push.imm.e 380
000001E0: conv.i.v
000001E4: push.imm.e 360
000001E8: conv.i.v
000001EC: push.v partRain
000001F4: call part_type_life(argc=3)
000001FC: popz
00000200: push.v partRain_sys
00000208: call part_emitter_create(argc=1)
00000210: pop.v.v partRain_emit
00000218: push.imm.e 0
0000021C: conv.i.v
00000220: push.imm.e 3
00000224: conv.i.v
00000228: push.imm.e -300
0000022C: conv.i.v
00000230: push.imm.e -300
00000234: conv.i.v
00000238: push.imm.e 5500
0000023C: conv.i.v
00000240: push.imm.e -400
00000244: conv.i.v
00000248: push.v partRain_emit
00000250: push.v partRain_sys
00000258: call part_emitter_region(argc=8)
00000260: popz
00000264: push.imm.e 15
00000268: conv.i.v
0000026C: push.v partRain
00000274: push.v partRain_emit
0000027C: push.v partRain_sys
00000284: call part_emitter_stream(argc=4)
0000028C: popz
00000290: push.builtin.v room_speed
00000298: push.imm.e 3
0000029C: mul.i.v
000002A0: conv.v.i
000002A4: dup 0
000002A8: push.i 0
000002B0: cmp.i.i <=
000002B4: bt 0x213C2A8
000002B8: push.v partRain_sys
000002C0: call part_system_update(argc=1)
000002C8: popz
000002CC: push.i 1
000002D4: sub.i.i
000002D8: dup 0
000002DC: conv.i.b
000002E0: bt 0x413C27C
000002E4: popz
000002E8: push.imm.e 0
000002EC: conv.i.v
000002F0: push.imm.e 280
000002F4: conv.i.v
000002F8: call action_set_alarm(argc=2)
00000300: popz