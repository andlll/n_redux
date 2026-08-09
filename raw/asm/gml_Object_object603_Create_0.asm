// gml_Object_object603_Create_0  locals=2 args=0 len=300
// locals: arguments, __b__
00000000: push.v y
00000008: neg.v.d
0000000C: push.imm.e 150
00000010: sub.i.v
00000014: pop.v.v depth
0000001C: push.d 1.3
00000028: conv.d.v
0000002C: push.imm.e 70
00000030: conv.i.v
00000034: call action_set_motion(argc=2)
0000003C: popz
00000040: push.imm.e 0
00000044: conv.i.v
00000048: push.imm.e 69
0000004C: conv.i.v
00000050: call action_set_alarm(argc=2)
00000058: popz
0000005C: push.imm.e 2
00000060: conv.i.v
00000064: call action_if_dice(argc=1)
0000006C: pop.v.v local.__b__
00000074: push.local.v local.__b__
0000007C: conv.v.b
00000080: bf 0x21EADD4
00000084: push.imm.e 2
00000088: conv.i.v
0000008C: call action_if_dice(argc=1)
00000094: pop.v.v local.__b__
0000009C: push.local.v local.__b__
000000A4: conv.v.b
000000A8: bf 0x21EADB0
000000AC: push.imm.e 1
000000B0: conv.i.v
000000B4: push.imm.e 0
000000B8: conv.i.v
000000BC: push.imm.e 1348
000000C0: conv.i.v
000000C4: call action_sprite_set(argc=3)
000000CC: popz
000000D0: b 0x21EADD4
000000D4: push.imm.e 1
000000D8: conv.i.v
000000DC: push.imm.e 0
000000E0: conv.i.v
000000E4: push.imm.e 1349
000000E8: conv.i.v
000000EC: call action_sprite_set(argc=3)
000000F4: popz
000000F8: push.imm.e 4
000000FC: conv.i.v
00000100: call action_if_dice(argc=1)
00000108: pop.v.v local.__b__
00000110: push.local.v local.__b__
00000118: conv.v.b
0000011C: bf 0x21EAE08
00000120: call action_kill_object(argc=0)
00000128: popz