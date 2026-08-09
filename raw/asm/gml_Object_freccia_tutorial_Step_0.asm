// gml_Object_freccia_tutorial_Step_0  locals=2 args=0 len=164
// locals: arguments, __b__
00000000: push.v obj140.x
00000008: push.v obj141.x
00000010: sub.v.v
00000014: pop.v.v shifta
0000001C: push.imm.e 2
00000020: conv.i.v
00000024: push.imm.e 0
00000028: conv.i.v
0000002C: push.v shifta
00000034: call action_if_variable(argc=3)
0000003C: pop.v.v local.__b__
00000044: push.local.v local.__b__
0000004C: conv.v.b
00000050: bf 0x209BE58
00000054: push.imm.e 0
00000058: pop.v.i shifta
00000060: push.imm.e 1
00000064: conv.i.v
00000068: push.imm.e -1000
0000006C: conv.i.v
00000070: push.v shifta
00000078: call action_if_variable(argc=3)
00000080: pop.v.v local.__b__
00000088: push.local.v local.__b__
00000090: conv.v.b
00000094: bf 0x209BE9C
00000098: push.imm.e -1000
0000009C: pop.v.i shifta