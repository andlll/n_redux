// gml_Object_placeholder_Create_0  locals=2 args=0 len=276
// locals: arguments, __b__
00000000: push.imm.e 1
00000004: conv.i.v
00000008: push.imm.e 0
0000000C: conv.i.v
00000010: push.imm.e 654
00000014: conv.i.v
00000018: call action_sprite_set(argc=3)
00000020: popz
00000024: push.imm.e 0
00000028: pop.v.i close
00000030: push.imm.e 0
00000034: pop.v.i making
0000003C: push.imm.e 0
00000040: pop.v.i auta
00000048: push.imm.e 0
0000004C: pop.v.i ult
00000054: push.imm.e 0
00000058: pop.v.i scrolling
00000060: push.imm.e 0
00000064: pop.v.i de
0000006C: push.imm.e 0
00000070: pop.v.i act
00000078: push.imm.e 1
0000007C: conv.i.v
00000080: push.imm.e 200
00000084: conv.i.v
00000088: call action_set_alarm(argc=2)
00000090: popz
00000094: push.imm.e 0
00000098: conv.i.v
0000009C: push.imm.e 0
000000A0: conv.i.v
000000A4: push.v act
000000AC: call action_if_variable(argc=3)
000000B4: pop.v.v local.__b__
000000BC: push.local.v local.__b__
000000C4: conv.v.b
000000C8: bf 0x21D9C38
000000CC: push.imm.e 0
000000D0: conv.i.v
000000D4: push.imm.e 0
000000D8: conv.i.v
000000DC: push.imm.e 736
000000E0: conv.i.v
000000E4: call action_if_number(argc=3)
000000EC: pop.v.v local.__b__
000000F4: push.local.v local.__b__
000000FC: conv.v.b
00000100: not.b.d
00000104: bf 0x21D9C38
00000108: push.imm.e 1
0000010C: pop.v.i act