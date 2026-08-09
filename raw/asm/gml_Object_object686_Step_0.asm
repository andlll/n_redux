// gml_Object_object686_Step_0  locals=2 args=0 len=472
// locals: arguments, __b__
00000000: push.imm.e -1
00000004: push.imm.e 0
00000008: push.v obj0.view_yview[array]
00000010: push.imm.e 20
00000014: add.i.v
00000018: push.imm.e -1
0000001C: push.imm.e 0
00000020: push.v obj0.view_xview[array]
00000028: push.imm.e 520
0000002C: add.i.v
00000030: call action_move_to(argc=2)
00000038: popz
0000003C: push.imm.e 156
00000040: pushenv 0x21E6F5C
00000044: push.imm.e 3
00000048: conv.i.v
0000004C: push.imm.e 0
00000050: conv.i.v
00000054: push.v oil
0000005C: call action_if_variable(argc=3)
00000064: pop.v.v local.__b__
0000006C: push.local.v local.__b__
00000074: conv.v.b
00000078: bf 0x21E6F5C
0000007C: b 0x21E6F64
00000080: popenv 0x41E6F20
00000084: b 0x21E6F68
00000088: popenv 0x1DE6F64
0000008C: push.local.v local.__b__
00000094: conv.v.b
00000098: bf 0x21E6FBC
0000009C: push.imm.e 0
000000A0: conv.i.v
000000A4: push.imm.e 0
000000A8: conv.i.v
000000AC: push.imm.e 736
000000B0: conv.i.v
000000B4: call action_if_number(argc=3)
000000BC: pop.v.v local.__b__
000000C4: push.local.v local.__b__
000000CC: conv.v.b
000000D0: bf 0x21E6FBC
000000D4: call action_kill_object(argc=0)
000000DC: popz
000000E0: push.imm.e 0
000000E4: conv.i.v
000000E8: push.imm.e 0
000000EC: conv.i.v
000000F0: push.v loan_uno
000000F8: call action_if_variable(argc=3)
00000100: pop.v.v local.__b__
00000108: push.local.v local.__b__
00000110: conv.v.b
00000114: bf 0x21E70B4
00000118: push.imm.e 0
0000011C: conv.i.v
00000120: push.imm.e 0
00000124: conv.i.v
00000128: push.v loan_due
00000130: call action_if_variable(argc=3)
00000138: pop.v.v local.__b__
00000140: push.local.v local.__b__
00000148: conv.v.b
0000014C: bf 0x21E70B4
00000150: push.imm.e 0
00000154: conv.i.v
00000158: push.imm.e 0
0000015C: conv.i.v
00000160: push.v loan_tre
00000168: call action_if_variable(argc=3)
00000170: pop.v.v local.__b__
00000178: push.local.v local.__b__
00000180: conv.v.b
00000184: bf 0x21E70B4
00000188: push.imm.e 0
0000018C: conv.i.v
00000190: push.imm.e 0
00000194: conv.i.v
00000198: push.v loan_quattro
000001A0: call action_if_variable(argc=3)
000001A8: pop.v.v local.__b__
000001B0: push.local.v local.__b__
000001B8: conv.v.b
000001BC: bf 0x21E70B4
000001C0: push.imm.e 132
000001C4: pushenv 0x21E70B0
000001C8: push.imm.e 0
000001CC: pop.v.i loaned
000001D4: popenv 0x41E70A4