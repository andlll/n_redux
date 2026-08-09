// gml_Object_farolux_Create_0  locals=1 args=0 len=216
// locals: arguments
00000000: push.imm.e 1
00000004: conv.i.v
00000008: call action_set_relative(argc=1)
00000010: popz
00000014: push.imm.e 100
00000018: conv.i.v
0000001C: push.imm.e 0
00000020: conv.i.v
00000024: push.imm.e 115
00000028: conv.i.v
0000002C: call action_create_object(argc=3)
00000034: popz
00000038: push.d 0.3
00000044: conv.d.v
00000048: push.imm.e 0
0000004C: conv.i.v
00000050: push.imm.e 191
00000054: conv.i.v
00000058: call action_sprite_set(argc=3)
00000060: popz
00000064: push.v y
0000006C: neg.v.d
00000070: push.imm.e 1
00000074: sub.i.v
00000078: pop.v.v depth
00000080: push.imm.e 0
00000084: conv.i.v
00000088: call action_set_relative(argc=1)
00000090: popz
00000094: push.imm.e 0
00000098: conv.i.v
0000009C: push.imm.e 40
000000A0: conv.i.v
000000A4: call action_set_alarm(argc=2)
000000AC: popz
000000B0: push.imm.e 1
000000B4: conv.i.v
000000B8: call action_set_relative(argc=1)
000000C0: popz
000000C4: push.imm.e 0
000000C8: conv.i.v
000000CC: call action_set_relative(argc=1)
000000D4: popz