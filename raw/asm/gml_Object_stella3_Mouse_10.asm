// gml_Object_stella3_Mouse_10  locals=2 args=0 len=244
// locals: arguments, __b__
00000000: push.imm.e 1
00000004: conv.i.v
00000008: call action_set_relative(argc=1)
00000010: popz
00000014: push.imm.e 0
00000018: conv.i.v
0000001C: push.imm.e 0
00000020: conv.i.v
00000024: push.imm.e 146
00000028: conv.i.v
0000002C: call action_create_object(argc=3)
00000034: popz
00000038: push.imm.e 0
0000003C: conv.i.v
00000040: push.imm.e 0
00000044: conv.i.v
00000048: push.imm.e 147
0000004C: conv.i.v
00000050: call action_create_object(argc=3)
00000058: popz
0000005C: push.imm.e 0
00000060: conv.i.v
00000064: push.imm.e 1
00000068: conv.i.v
0000006C: push.v unlocinque
00000074: call action_if_variable(argc=3)
0000007C: pop.v.v local.__b__
00000084: push.local.v local.__b__
0000008C: conv.v.b
00000090: bf 0x21E0074
00000094: push.imm.e 675
00000098: conv.i.v
0000009C: push.v y
000000A4: push.v x
000000AC: call instance_create(argc=3)
000000B4: popz
000000B8: b 0x21E0098
000000BC: push.imm.e 676
000000C0: conv.i.v
000000C4: push.v y
000000CC: push.v x
000000D4: call instance_create(argc=3)
000000DC: popz
000000E0: push.imm.e 0
000000E4: conv.i.v
000000E8: call action_set_relative(argc=1)
000000F0: popz