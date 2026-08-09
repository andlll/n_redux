// gml_Object_laserone_Create_0  locals=1 args=0 len=256
// locals: arguments
00000000: push.imm.e 1
00000004: pop.v.i nocivo
0000000C: push.v y
00000014: neg.v.d
00000018: push.imm.e 3500
0000001C: sub.i.v
00000020: pop.v.v depth
00000028: push.imm.e 0
0000002C: conv.i.v
00000030: push.imm.e 30
00000034: conv.i.v
00000038: call action_set_alarm(argc=2)
00000040: popz
00000044: push.imm.e 0
00000048: conv.i.v
0000004C: push.imm.e 0
00000050: conv.i.v
00000054: push.imm.e 2
00000058: conv.i.v
0000005C: push.imm.e 2
00000060: conv.i.v
00000064: call action_sprite_transform(argc=4)
0000006C: popz
00000070: push.imm.e 15
00000074: conv.i.v
00000078: push.v y
00000080: push.v x
00000088: call instance_nearest(argc=3)
00000090: conv.v.i
00000094: push.v [stacktop].y
0000009C: push.imm.e 15
000000A0: conv.i.v
000000A4: push.v y
000000AC: push.v x
000000B4: call instance_nearest(argc=3)
000000BC: conv.v.i
000000C0: push.v [stacktop].x
000000C8: push.v y
000000D0: push.v x
000000D8: call point_direction(argc=4)
000000E0: pop.v.v image_angle
000000E8: push.imm.e 0
000000EC: pop.v.i dat
000000F4: push.imm.e 1
000000F8: pop.v.i ratt