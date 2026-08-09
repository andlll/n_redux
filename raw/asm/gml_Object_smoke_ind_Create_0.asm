// gml_Object_smoke_ind_Create_0  locals=2 args=0 len=312
// locals: arguments, __b__
00000000: push.imm.e 1
00000004: pop.v.i xsca
0000000C: push.v y
00000014: neg.v.d
00000018: push.imm.e 150
0000001C: sub.i.v
00000020: pop.v.v depth
00000028: push.d 1.3
00000034: conv.d.v
00000038: push.imm.e 70
0000003C: conv.i.v
00000040: call action_set_motion(argc=2)
00000048: popz
0000004C: push.imm.e 0
00000050: conv.i.v
00000054: push.imm.e 69
00000058: conv.i.v
0000005C: call action_set_alarm(argc=2)
00000064: popz
00000068: push.imm.e 2
0000006C: conv.i.v
00000070: call action_if_dice(argc=1)
00000078: pop.v.v local.__b__
00000080: push.local.v local.__b__
00000088: conv.v.b
0000008C: bf 0x21EAC04
00000090: push.imm.e 2
00000094: conv.i.v
00000098: call action_if_dice(argc=1)
000000A0: pop.v.v local.__b__
000000A8: push.local.v local.__b__
000000B0: conv.v.b
000000B4: bf 0x21EABE0
000000B8: push.imm.e 1
000000BC: conv.i.v
000000C0: push.imm.e 0
000000C4: conv.i.v
000000C8: push.imm.e 1348
000000CC: conv.i.v
000000D0: call action_sprite_set(argc=3)
000000D8: popz
000000DC: b 0x21EAC04
000000E0: push.imm.e 1
000000E4: conv.i.v
000000E8: push.imm.e 0
000000EC: conv.i.v
000000F0: push.imm.e 1349
000000F4: conv.i.v
000000F8: call action_sprite_set(argc=3)
00000100: popz
00000104: push.imm.e 4
00000108: conv.i.v
0000010C: call action_if_dice(argc=1)
00000114: pop.v.v local.__b__
0000011C: push.local.v local.__b__
00000124: conv.v.b
00000128: bf 0x21EAC38
0000012C: call action_kill_object(argc=0)
00000134: popz